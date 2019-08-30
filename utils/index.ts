/**
 * classnames
 */
export function classnames(...classNames: Array<string | {[key: string]: boolean} | string[] | undefined>): string {

    const classes: string[] = [];

    for (const cls of classNames) {

        if (!cls) {
            continue;
        }

        if (typeof cls === "string") {
            classes.push(cls);
        } else if (Array.isArray(cls)) {

            cls.forEach((item) => {
                if (item) {
                    classes.push(item);
                }
            });

        } else if (typeof cls === "object" && cls) {

            Object.keys(cls).forEach((key) => {
                if (cls[key]) {
                    classes.push(key);
                }
            });
        }
    }

    return classes.join(" ");
}

/**
 * 提取所有没在定义中的HTML属性，并追加到定义里
 */
export type UnionOmit<T, K> = T & Omit<K, keyof T>;
