### Task Execution 任务的执行

#### when/sequence





    return:

    When all tasks have completed,
    the returned promise will resolve to an array containing the result of each task at the corresponding(相应的) array position,
    The returned promise will reject when any task throws or returns a rejection.