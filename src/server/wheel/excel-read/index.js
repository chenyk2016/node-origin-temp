const xlsx = require('node-xlsx')

async function readExcel(excelFilePath) {
  const workSheetsFromFile = xlsx.parse(excelFilePath)
  return workSheetsFromFile
}

module.exports = {
  readExcel,
}