/**
 * 嵌套对象动态链式取值
 * mb([xx, xxx])(obj)
 */
const mb = (p: any) => (o: any) => p.map((c: any) => (o = (o || {})[c])) && o

export { mb }
