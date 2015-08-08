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

    function findstackoverflow(e)//when click on find ajax api calls to reputation by user
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
                //clear the graph
                $("#container").html("");
                //the graph is for first user that get from api and represet his reputation in number

                //the title
                var names = [
					"change_day", "change_month", "change_quarter", "change_week", "change_year"];
                //the data
                var chartdata = [ 
                    data.items[0].reputation_change_day,
                    data.items[0].reputation_change_month,
                    data.items[0].reputation_change_quarter,
                    data.items[0].reputation_change_week,
                    data.items[0].reputation_change_year
                ];
               //size of the graph and bar
                var chart,
                 width = 1000,
                 bar_height = 20,
                 height = bar_height * names.length;

                

                var x, y;
                x = d3.scale.linear()
                   .domain([0, d3.max(chartdata)])
                   .range([0, width]);

                y = d3.scale.ordinal()
                   .domain(chartdata)
                   .rangeBands([0, height]);

         
                //create graph by appending to container div 
                var left_width = 100;

                chart = d3.select($("#container")[0])
                  .append('svg')
                  .attr('class', 'chart')
                  .attr('width', left_width + width)
                  .attr('height', height);
                //select the data
                chart.selectAll("rect")
                  .data(chartdata)
                  .enter().append("rect")
                  .attr("x", left_width)
                  .attr("y", y)
                  .attr("width", x)
                  .attr("height", y.rangeBand());

                chart.selectAll("text.score")
                  .data(chartdata)
                  .enter().append("text")
                  .attr("x", function (d) { return x(d) + left_width; })
                  .attr("y", function (d) { return y(d) + y.rangeBand() / 2; })
                  .attr("dx", -5)
                  .attr("dy", ".36em")
                  .attr("text-anchor", "end")
                  .attr('class', 'score')
                  .text(String);
                //add the title to the name
                chart.selectAll("text.name")
                  .data(names)
                  .enter().append("text")
                  .attr("x", left_width / 2)
                  .attr("y", function (d) { return y(d) + y.rangeBand() / 2; })
                  .attr("dy", ".36em")
                  .attr("text-anchor", "middle")
                  .attr('class', 'name')
                  .text(String);
               
					
            },
            error: function (message) {//case failed to get from server
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