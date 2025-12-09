import type globals from "globals";

export { globals };
export function setPkgJsonPath(path: string): void;
export function hxmstyleESLint(): Promise<import("eslint").Linter.Config[]>;
