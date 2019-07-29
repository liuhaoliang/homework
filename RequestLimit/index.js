class RequestLimit {
  constructor(maxLimit) {
    this.maxLimit = maxLimit; /**可并行最大数量 */
    this.waitingQueue = []; /**等待的任务 */
    this.runningQueue = []; /**执行的任务 */
  }

  /**执行任务 */
  runTask(task) {
    task && this.waitingQueue.push(task);
    const availableCount = this.maxLimit - this.runningQueue.length;
    if (availableCount > 0 && this.waitingQueue.length > 0) {
      const waitingTask = this.waitingQueue.shift();
      const waitingLength = this.runningQueue.push(waitingTask);
      waitingTask().then(data => {
        console.log(data);
        this.runningQueue.splice(waitingLength - 1, 1);
        this.runTask();
      });
    }
  }

  /**批量添加任务并执行 */
  runTaskList(taskList=[]) {
    this.waitingQueue.push(...taskList);
    this.runTask();
  }
}

module.exports = RequestLimit;
