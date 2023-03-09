export function getDateTostring(obj: any): { start: string; end: string } {
  console.log(
    {
      start: obj.date[0].format('YY-MM-DD H:m:s'),
      end: obj.date[1].format('YY-MM-DD H:m:s'),
    },
    '====sss'
  )
  return {
    start: obj.date[0].format('YYYY-MM-DD HH:mm:ss'),
    end: obj.date[1].format('YYYY-MM-DD HH:mm:ss'),
  }
}
