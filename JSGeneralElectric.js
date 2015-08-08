function findActivityManager() {
   
    function init()
    {
        bindClickEvents.call(this);
        return this;
    }

    function bindClickEvents()
    {
        $("#findid").on("click", findstackoverflow);
    }

    function findstackoverflow(e)
    {
        var NNAME = +$('#nNameID').val(),
            self = this;

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://api.stackexchange.com/2.2/users?order=desc&sort=reputation&inname="+$('#nNameID').val()+"&site=stackoverflow",
            success: function (data)
            {
                console.log(data);
                $("svg").empty();
                // create data structure for d3 - using response & reputation for the first user
                var chartdata = [ 
                    data.items[0].reputation_change_day,
                    data.items[0].reputation_change_month,
                    data.items[0].reputation_change_quarter,
                    data.items[0].reputation_change_week,
                    data.items[0].reputation_change_year
                ];
				var chartNames = [
					"reputation_change_day", "reputation_change_month", "reputation_change_quarter", "reputation_change_week", "reputation_change_year"];

                var width = 720,
					height = 200,
                    barHeight = 20,
					barWidth = 20,
					barOffset = 20;

				d3.select('.d3-visualize').append('svg')
				  .attr('width', width)
				  .attr('height', height)
				  .style('background', '#dff0d8')
				  .selectAll('rect').data(chartdata)
				  .enter().append('rect')
					.attr('width', barWidth)
					.attr('height', function (data) {
						return data;
					})
					.attr('x', function (data, i) {
						return i * (barWidth + barOffset);
					})
					.attr('y', function (data) {						
						return height - data;
					});
					
            },
            error: function (message) {
                $("#failureMessageNotification").html("<strong>error geting data</strong> " + message + " <a class='alert-link try-again'></a>").show()
                
            }
        });
    }

    return {
        init: init
    };
}

function longdateConvert(ldate)
{
   
    return new Date(ldate * 1000);
   
}