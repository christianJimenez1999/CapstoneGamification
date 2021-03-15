console.log("i live!!!");

function requestCandidateId() {
    $(document).ready(function() {
        
        $.ajax({
            method: 'GET',
            url: 'create_candidate',
            datatype: 'json',
            success: function(results) {
                console.log("results", results);
                if(results['result']) {
                    $("#id_display").html("Here is the generated ID for the candidate: " + results['cand_id']);
                }
                else{
                    $("#id_display").html("Please try again, something failed on the backend.")
                }
            },
            error: function(error) {
                console.log("error", error);
                $("#id_display").html("Please try again, something failed on the backend.")
            }
        });
    });
}
