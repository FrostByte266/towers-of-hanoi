export default function zip<T, U>(firstArray: Array<T>, secondArray: Array<U>){
  return Array(Math.max(firstArray.length, secondArray.length))
    .fill(null)
    .map((_, i) => [firstArray[i], secondArray[i]] as [T, U])
}
