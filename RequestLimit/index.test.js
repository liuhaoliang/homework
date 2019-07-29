const RequestLimit = require("./index");
const http = require("http");

/**创建服务 */
http
  .createServer((req, res) => {
    const { url } = req;
    res.end(url);
  })
  .listen(8888);

/**准备异步任务 */
const mockTask = id => {
  return () =>
    new Promise((resolve, reject) => {
      const req = http.get(`http://localhost:8888/?id=${id}`, data => {
        let str = "";
        data.on("data", chunk => {
          str += chunk;
        });
        data.on("end", () => {
          resolve(str.toString());
        });
      });
      req.on("error", function(e) {
        reject();
      });
    });
};

/**设置并发数 */
const requestLimit = new RequestLimit(10);

/**批量执行任务1 */
for (let index = 0; index < 100; index++) {
  requestLimit.runTask(mockTask(index));
}

// /**批量执行任务2 */
// const taskList = [];
// for (let index = 0; index < 100; index++) {
//   taskList.push(mockTask(index));
// }
// requestLimit.runTaskList(taskList);
