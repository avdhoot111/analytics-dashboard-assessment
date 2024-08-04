import Papa from 'papaparse';

export const parseCSV = (url: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            resolve(results.data);
          },
          error: function(error: any) {
            reject(error);
          }
        });
      })
      .catch(error => reject(error));
  });
};
