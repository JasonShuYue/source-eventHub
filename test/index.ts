import EventHub from "../src/index";

const test1 = (message) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object);
  console.log(message);
};

const test2 = (message) => {
  const eventHub = new EventHub();
  const originData = "123123";
  let flag = false;
  eventHub.on("xxx", (data) => {
    flag = true;
    console.assert(data === originData);
  });
  eventHub.emit("xxx", originData);
  setTimeout(() => {
    console.assert(flag === true);
  }, 1000);
  console.log(message);
};

const test3 = (message) => {
  const eventHub = new EventHub();
  let flag = false;
  let fn = () => {
    flag = true;
  };
  eventHub.on("xxx", fn);
  eventHub.off("xxx", fn);
  eventHub.emit("xxx");
  setTimeout(() => {
    console.assert(flag === false);
  }, 1000);
  console.log(message);
};

test1("测试：EventHub可以创建对象");
test2("测试：.on之后，触发.emit，会调用.on的函数");
test1("测试：.off有用");
