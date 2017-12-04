function plotAssemblyTable(json) {
    var hasScaffolds = json.hasOwnProperty('Number of scaffolds');
    var hasContigs = json.hasOwnProperty('Number of contigs');
    var parent = d3.select('#assembly-table');
    var table = parent.append('table');
    var thead = table.append('thead');
    var tbody = table.append('tbody');
    if (!hasScaffolds) {
      var columnNames = ['Property', 'Contigs'];
      var rowMap = {
        'Total number of sequences': ['Number of contigs'],
        'Total size of sequences': ['Total size of contigs'],
        'Longest sequence': ['Longest contig'],
        'Shortest sequqnce': ['Shortest contig'],
        'Number of sequences (>= 1k nt)':['Number of contigs (>= 1k nt)'],
        'Number of sequences (>= 10k nt)':['Number of contigs (>= 10k nt)'],
        'Number of sequences (>= 100k nt)':['Number of contigs (>= 100k nt)'],
        'Number of sequences (>= 1M nt)':['Number of contigs (>= 1M nt)'],
        'Number of sequences (>= 10M nt)':['Number of contigs (>= 10M nt)'],
        'Mean sequence size':['Mean contig size'],
        'Median sequeuce size':['Mean contig size'],
        ' A (%)':['Contig A (%)'],
        ' C (%)':['Contig C (%)'],
        ' G (%)':['Contig G (%)'],
        ' T (%)':['Contig T (%)'],
        ' N (%)':['Contig N (%)'],
        'Non-ACGTN (%)':['Contig non-ACGTN (%)'],
        'GC content of sequences (%)':['GC content of contigs (%)'],
        'N50 of sequences':['N50 of contigs'],
        'L50 of sequences':['L50 of contigs'],
      };
    } else if (!hasContigs) {
      var columnNames = ['Property','Scaffolds'];
      var rowMap = {
        'Total number of sequences': ['Number of scaffolds'],
        'Total size of sequences': ['Total size of scaffolds'],
        'Longest sequence': ['Longest scaffold'],
        'Shortest sequqnce': ['Shortest scaffold'],
        'Number of sequences (>= 1k nt)':['Number of scaffolds (>= 1k nt)'],
        'Number of sequences (>= 10k nt)':['Number of scaffolds (>= 10k nt)'],
        'Number of sequences (>= 100k nt)':['Number of scaffolds (>= 100k nt)'],
        'Number of sequences (>= 1M nt)':['Number of scaffolds (>= 1M nt)'],
        'Number of sequences (>= 10M nt)':['Number of scaffolds (>= 1M nt)'],
        'Mean sequence size':['Mean scaffold size'],
        'Median sequeuce size':['Median scaffold size'],
        ' A (%)':['Scaffold A (%)'],
        ' C (%)':['Scaffold C (%)'],
        ' G (%)':['Scaffold G (%)'],
        ' T (%)':['Scaffold T (%)'],
        ' N (%)':['Scaffold N (%)'],
        'Non-ACGTN (%)':['Scaffold non-ACGTN (%)'],
        'GC content of sequences (%)':['GC content of scaffolds (%)'],
        'N50 of sequences':['N50 of scaffolds'],
        'L50 of sequences':['L50 of scaffolds'],
      };
    } else {
      var columnNames = ['Property','Scaffolds','Contigs'];
      var rowMap = {
        'Total number of sequences': ['Number of scaffolds', 'Number of contigs'],
        'Total size of sequences': ['Total size of scaffolds','Total size of contigs'],
        'Longest sequence': ['Longest scaffold','Longest contig'],
        'Shortest sequqnce': ['Shortest scaffold','Shortest contig'],
        'Number of sequences (>= 1k nt)':['Number of scaffolds (>= 1k nt)','Number of contigs (>= 1k nt)'],
        'Number of sequences (>= 10k nt)':['Number of scaffolds (>= 10k nt)','Number of contigs (>= 10k nt)'],
        'Number of sequences (>= 100k nt)':['Number of scaffolds (>= 100k nt)','Number of contigs (>= 100k nt)'],
        'Number of sequences (>= 1M nt)':['Number of scaffolds (>= 1M nt)','Number of contigs (>= 1M nt)'],
        'Number of sequences (>= 10M nt)':['Number of scaffolds (>= 1M nt)','Number of contigs (>= 10M nt)'],
        'Mean sequence size':['Mean scaffold size','Mean contig size'],
        'Median sequeuce size':['Median scaffold size','Mean contig size'],
        ' A (%)':['Scaffold A (%)','Contig A (%)'],
        ' C (%)':['Scaffold C (%)','Contig C (%)'],
        ' G (%)':['Scaffold G (%)','Contig G (%)'],
        ' T (%)':['Scaffold T (%)','Contig T (%)'],
        ' N (%)':['Scaffold N (%)','Contig N (%)'],
        'Non-ACGTN (%)':['Scaffold non-ACGTN (%)','Contig non-ACGTN (%)'],
        'GC content of sequences (%)':['GC content of scaffolds (%)','GC content of contigs (%)'],
        'N50 of sequences':['N50 of scaffolds','N50 of contigs'],
        'L50 of sequences':['L50 of scaffolds','L50 of contigs'],
      };
    }
    var rowNames = [
      'Total number of sequences',
      'Total size of sequences',
      'Longest sequence',
      'Shortest sequqnce',
      'Number of sequences (>= 1k nt)',
      'Number of sequences (>= 10k nt)',
      'Number of sequences (>= 100k nt)',
      'Number of sequences (>= 1M nt)',
      'Number of sequences (>= 10M nt)',
      'Mean sequence size',
      'Median sequeuce size',
      ' A (%)',
      ' C (%)',
      ' G (%)',
      ' T (%)',
      ' N (%)',
      'Non-ACGTN (%)',
      'GC content of sequences (%)',
    ];

    thead.append('tr')
      .selectAll('th')
      .data(columnNames)
      .enter()
      .append('th')
      .text(function(d) {
        return d;
      });
    var rows = tbody.selectAll('tr')
                .data(rowNames)
                .enter()
                .append('tr');

    var rowHeaders = rows
                .append('th')
                .text(function (d) { return d });
    
    var cells = rows.selectAll('tr')
	  .data(function (key){
      [scaffoldProperty, contigProperty] = rowMap[key];
      return [json[scaffoldProperty], json[contigProperty]];
    })
    .enter()
    .append('td')
    .text(function(d) { return d });
}
