/**
 * 这个文件演示了 ES Modules 的导出 (Export)
 */

// 1. 命名导出 (Named Export)
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

// 2. 导出接口或类型
export interface User {
    id: number;
    name: string;
}

export type Operation = (a: number, b: number) => number;

// 3. 默认导出 (Default Export)
// 一个文件只能有一个默认导出，通常用于导出类或主函数
export default class Calculator {
    multiply(a: number, b: number): number {
        return a * b;
    }
}
