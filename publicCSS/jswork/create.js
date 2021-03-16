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

function seeCandidate() {
    $(document).ready(function() {
        var cand_id = $("#search_id").val();
        console.log("cand_id:",cand_id)
        $.ajax({
            method: 'GET',
            url: '/get_candidate/' + cand_id,
            datatype: 'json',
            success: function(results) {
                console.log("results", results);
                if(results['result']) {
                    $('#cand_id').html("Here is the candidate's current status" + results['data']);
                }
                else {
                    $('#cand_id').html("Error in the backend, try again");
                }
            },
            error: function(error) {
                console.log("error", error);
                $('#cand_id').html("Error in the backend, try again");
            }
        })
    });
}