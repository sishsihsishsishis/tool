import { onMounted } from 'vue'
export const useMounted = (fun: (arg: Promise<void>) => void) => {
  let Mounted = new Promise<void>(resolve=>{
    onMounted(()=>{
      resolve()
    })
  })
  fun(Mounted)
}