export default function asyncThrow(errorOrMessage) {
  const error =
    errorOrMessage instanceof Error ? errorOrMessage : new Error(errorOrMessage)
  setTimeout(() => {
    throw error
  })
}
