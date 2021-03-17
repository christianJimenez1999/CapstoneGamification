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
                    $("#id_display").html("<h3>Here is the generated ID for the candidate: " + results['cand_id'] + "</h3>");
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
        if(cand_id){
            $.ajax({
                method: 'GET',
                url: '/get_candidate/' + cand_id,
                datatype: 'json',
                success: function(results) {
                    console.log("results", results);
                    if(results['result']) {
                        try {
                            // $('#search_results').prepend("<div><h3>Here is candidate's " + results['data']['candidate_id'] + " current status <h3><h1>");
                            
                            let categories =  "<h5>Categories</h5><table> <tr> <th>Completed</th> <th>Correct</th> <th>Wrong</th> <th>start_time</th> <th>end_time</th> </tr>"+
                            "<td> " + results['data']['categories_completed'] + " </td><td> " + results['data']['categories_correct'] + " </td><td> " + 
                            results['data']['categories_wrong'] + " </td><td> " + results['data']['categories_start_time'] + " </td><td> " + results['data']['categories_end_time'] +
                            " </td></tr></table>";
                            categories = categories.replaceAll("null", "n/a");
                            
                            let fast_or_faster = "<h5>Fast or Faster</h5><table> <tr> <th>Completed</th> <th>Points</th> </tr>"+
                            "<td> " + results['data']['fast_or_faster_completed'] + " </td><td> " + results['data']['fast_or_faster_points'] +
                            " </td></tr></table>";
                            fast_or_faster = fast_or_faster.replaceAll("null", "n/a");
                            
                            
                            let game_pad =  "<h5>Game Pad</h5><table> <tr> <th>Completed</th> <th>Correct</th> <th>Wrong</th> <th>start_time</th> <th>end_time</th> </tr>"+
                            "<td> " + results['data']['game_pad_completed'] + " </td><td> " + results['data']['game_pad_correct'] + " </td><td> " + 
                            results['data']['game_pad_wrong'] + " </td><td> " + results['data']['game_pad_start_time'] + " </td><td> " + results['data']['game_pad_end_time'] +
                            " </td></tr></table>";
                            game_pad = game_pad.replaceAll("null", "n/a");
                            
                            let simon_says =  "<h5>Simon Says</h5><table> <tr> <th>Completed</th> <th>Points</th> <th>start_time</th> <th>end_time</th> </tr>"+
                            "<td> " + results['data']['simon_says_completed'] + " </td><td> " + results['data']['simon_says_points'] +
                            " </td><td> " + results['data']['simon_says_start_time'] + " </td><td> " + results['data']['simon_says_end_time'] +
                            " </td></tr></table>";
                            simon_says = simon_says.replaceAll("null", "n/a");
                            
                            let where_my_error =  "<h5>Where's My Error</h5><table> <tr> <th>Completed</th> <th>Correct</th> <th>Wrong</th> <th>start_time</th> <th>end_time</th> </tr>"+
                            "<td> " + results['data']['where_my_error_completed'] + " </td><td> " + results['data']['where_my_error_correct'] + " </td><td> " + 
                            results['data']['where_my_error_wrong'] + " </td><td> " + results['data']['where_my_error_start_time'] + " </td><td> " + results['data']['where_my_error_end_time'] +
                            " </td></tr></table>";
                            where_my_error = where_my_error.replaceAll("null", "n/a");
                            
                            let result_div = "<div>" + categories + fast_or_faster + game_pad + simon_says + where_my_error + "<div>";
                            
                            $('#search_results').prepend(result_div);
                            
                            $('#search_results').prepend("<div><h3>Here is candidate's " + results['data']['candidate_id'] + " current status <h3><h1>");
                            
                            $('#cand_display').html(""); // just to clear any possible previous error message
                        }
                        catch (error) {
                            $('#cand_display').html("Error in the backend, try again");
                        }
                    }
                    else {
                        $('#cand_display').html("Error in the backend, try again");
                    }
                },
                error: function(error) {
                    console.log("error", error);
                    $('#cand_id').html("Error in the backend, try again");
                }
            });
    
        }
        });
}