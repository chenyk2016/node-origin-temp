import insertTodayDataTask from './modules/work-inset-today-data'

// 服务运行即可启动任务
const manager = {
  async start() {
    console.log('任务启动:')
    const msg = await insertTodayDataTask.start()

    return msg
  },
  async status() {
    const msg = await insertTodayDataTask.start()
    return msg
  }
}

export default manager
