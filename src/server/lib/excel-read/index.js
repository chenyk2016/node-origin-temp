import xlsx from 'node-xlsx'

async function readExcel(excelFilePath) {
  const workSheetsFromFile = xlsx.parse(excelFilePath)
  return workSheetsFromFile
}

export default {
  readExcel
}