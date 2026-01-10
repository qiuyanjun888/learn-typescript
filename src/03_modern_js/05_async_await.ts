/**
 * TypeScript 异步编程：Promise 与 Async/Await
 * 
 * 对于 Java 开发者：
 * - JavaScript 是单线程的，所以不能像 Java 那样通过 `Thread.sleep()` 阻塞线程。
 * - `Promise` 类似于 Java 的 `CompletableFuture`。
 * - `async/await` 是一种让异步代码写起来像同步代码的“语法糖”。
 */

// 1. 定义一个返回 Promise 的异步函数
// 模拟一个 API 调用或耗时操作
const fetchUserData = (id: number): Promise<{ id: number; name: string }> => {
    return new Promise((resolve, reject) => {
        /**
         * resolve: 成功时的回调函数。调用它会将 Promise 状态改为 "fulfilled" (已完成)，
         *          并将结果传递出去。类似 Java 的 future.complete(value)。
         * 
         * reject:  失败时的回调函数。调用它会将 Promise 状态改为 "rejected" (已拒绝)，
         *          并抛出一个错误。类似 Java 的 future.completeExceptionally(ex)。
         */
        console.log(`正在请求用户数据 (ID: ${id})...`);

        // 模拟 1.5 秒的网络延迟
        setTimeout(() => {
            const success = true;
            if (success) {
                // 任务成功，返回数据
                resolve({ id: id, name: "Bruce Wayne" });
            } else {
                // 任务失败，返回错误原因
                reject(new Error("用户不存在"));
            }
        }, 1500);
    });
};

// 2. 使用 async/await (现代推荐方式)
// 必须在标记为 async 的函数内部使用 await
const showUserDetails = async () => {
    try {
        console.log("--- 任务开始 ---");

        // await 会暂停当前 async 函数的执行，等待 Promise 解决
        // 但它不会阻塞整个浏览器的线程
        const user = await fetchUserData(1);

        console.log("获取成功:", user.name);
        console.log("--- 任务结束 ---");
    } catch (error) {
        // 这里的 catch 捕获来自 reject 的错误
        console.error("捕获到错误:", error);
    }
};

// 3. 并发执行：Promise.all (多任务协作)
// 类似于 Java 的 CompletableFuture.allOf().join()
const runParallelTasks = async () => {
    console.log("\n--- 并发任务开始 ---");
    const startTime = Date.now();

    try {
        // 同时发起多个请求，而不是一个接一个等待
        const results = await Promise.all([
            fetchUserData(1),
            fetchUserData(2),
            fetchUserData(3)
        ]);

        console.log("所有任务完成:", results.map(r => r.name));
        console.log(`总耗时: ${Date.now() - startTime}ms (应该是 1500ms 左右，而不是 4500ms)`);
    } catch (error) {
        console.error("其中一个任务失败了:", error);
    }
};

// 执行示例
const main = async () => {
    await showUserDetails();
    await runParallelTasks();
};

main();

// 4. 传统写法：.then() / .catch() (不推荐，但要看得懂)
/*
fetchUserData(1)
    .then(user => console.log(user))
    .catch(err => console.error(err))
    .finally(() => console.log("Done"));
*/
