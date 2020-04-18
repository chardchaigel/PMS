function getExcel() {
        let table = $("#goalsData");

        $("#btn-spinner").removeClass("fa fa-save").addClass("fa fa-spinner fa-spin");
        $("#btn-upload").prop('disabled', true);
        $("#btn-upload-text").text("Processing");
        
        table.empty();

        var input = document.getElementById("uploadFile");
        readXlsxFile(input.files[0]).then(function(rows) {
            // console.log(rows);
            // console.log(rows[0][0]);

            // Get column names
            let columns = [];
            let firstLine = 4;
            rows[firstLine].forEach( function(item, index) {
                columns.push(item);                
            });
            // console.log(columns);            

            // Find last line of Coporate Goals
            let lastline = -1;
            rows.forEach(function (item, index) {
                if(item[0] === 'คะแนน Corporate Goal') {
                    lastline = index;                    
                }
            });
            if (lastline === -1) {
                alert('ไฟล์ที่จะ Upload ไม่ถูกต้อง');
                console.log("Wrong file to upload.");

                $("#btn-upload").prop('disabled', true);
                $("#btn-upload-text").text("Upload");
                $("#btn-spinner").removeClass("fa fa-spinner fa-spin").addClass("fa fa-save");
                return;
            }

            // Retrieve Coporate Goals data
            let goals = [];
            
            for (let rowNum=firstLine+1; rowNum<=lastline-1; rowNum++) {
                let cols = [];
                rows[rowNum].forEach( function(item, index) {
                    cols.push(item);
                });
                goals.push(cols);
            }
            console.log(goals);

            // rows.forEach(function (item, index) {
            //     console.log(item);
            // });

            // Append data to table
            let reloadTable = function(goals) {
                // console.log('Reload Table');

                // table.empty();
                goals.forEach(function(goal) {
                    table.append("<tr><td>" + goal[1] + "</td>" 
                    + "<td>" + goal[2] + "</td>"
                    + "<td>" + goal[4] + "</td>"
                    + "<td>" + goal[5] + "</td>"
                    + "<td>" + (parseFloat(goal[6]) * 100) + "%</td>"
                    + "<td>" + goal[7] + "</td>"
                    + "<td>" + goal[8] + "</td>"
                    + "<td>" + goal[9] + "</td>"
                    + "<td>" + goal[10] + "</td>"
                    + "<td>" + goal[11] + "</td>"
                    + "</tr>");
                });  
            }

            reloadTable(goals);
            
            $("#btn-spinner").removeClass("fa fa-spinner fa-spin").addClass("fa fa-save");
            $("#btn-upload-text").text("Upload");
            $("#btn-upload").prop('disabled', false);
        });
}
