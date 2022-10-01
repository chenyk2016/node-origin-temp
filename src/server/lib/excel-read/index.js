import xlsx from 'node-xlsx'

export async function readExcel(excelFilePath) {
  const workSheetsFromFile = xlsx.parse(excelFilePath)
  return workSheetsFromFile
}

export default {
  readExcel
}