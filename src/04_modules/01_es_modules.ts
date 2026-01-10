/**
 * TypeScript 模块系统：ES Modules 与 tsconfig.json 配置
 * 
 * 对于 Java 开发者：
 * - ES Modules (ESM) 类似于 Java 的 `package` 和 `import` 系统。
 * - 每个 `.ts` 文件默认都是一个独立的作用域（模块）。
 * - `import` 必须位于文件的顶部。
 */

// 1. 命名导入 (Named Import)
// 使用花括号导入特定成员
// 当开启 verbatimModuleSyntax 时，接口/类型导入建议加上 type 关键字
import { PI, add, type User } from "./utils";

// 2. 默认导入 (Default Import)
// 不需要花括号，名字可以自定义（通常与类名一致）
import Calculator from "./utils";

// 3. 命名空间导入 (Namespace Import)
// 将所有导出成员打包到一个对象中，类似 Java 的 import static ...*
import * as Utils from "./utils";

// 4. 类型导入 (Type-only Import)
// 性能优化：告诉编译器这只是一个类型，编译成 JS 时会被完全删掉
// 在 tsconfig.json 开启 "verbatimModuleSyntax": true 时，建议显式使用 type
import type { Operation } from "./utils";

const main = () => {
    console.log("--- ES Modules 示例 ---");

    // 使用命名导入的内容
    console.log("PI:", PI);
    console.log("Sum:", add(10, 20));

    // 使用默认导入的类
    const calc = new Calculator();
    console.log("Multiply:", calc.multiply(6, 7));

    // 使用命名空间的内容
    console.log("Utils.PI:", Utils.PI);

    // 使用接口类型
    const user: User = { id: 1, name: "Bruce" };
    console.log("User:", user);

    const op: Operation = (x, y) => x / y;
    console.log("Operation result:", op(10, 2));
};

main();

/**
 * ---------------------------------------------------------
 * 5. tsconfig.json 中的模块相关配置 (重要)
 * ---------------------------------------------------------
 * 
 * 在你的 tsconfig.json 中，有几个关键配置决定了模块的行为：
 * 
 * 1. "module": "esnext"
 *    - 理解：决定编译生成的 JavaScript 代码使用什么模块规范。
 *    - esnext 会保留 import/export 语法，适合 Webpack, Vite 等现代工具。
 *    - 如果改为 "commonjs"，编译后会变成 require/exports (Node.js 旧规范)。
 * 
 * 2. "moduleResolution": "node10" (或 "bundler"/"node16")
 *    - 理解：决定编译器如何去查找文件。
 *    - node10 是较旧的 Node 查找逻辑。
 *    - bundler 是目前前端项目（Vite/Webpack）最推荐的设置。
 * 
 * 3. "verbatimModuleSyntax": true
 *    - 理解：强制要求区分“类型导入”和“值导入”。
 *    - 效果：如果在导入类型（如 interface）时没写 `type` 关键字，TS 可能会报错。
 *    - 好处：确保生成的 JS 中没有无用的类型引用，对 Tree Shaking 友好。
 * 
 * 4. "esModuleInterop": true (通常建议开启)
 *    - 理解：允许在 ESM 中平滑地导入 CommonJS 模块（比如 fs, path）。
 *    - 效果：即使第三方包没写 export default，你也能用 import x from 'y' 直接导入。
 */
