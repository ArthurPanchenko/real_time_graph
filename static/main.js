let ctx = document.getElementById('graphChart')

let graphData = {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40, 96, 43, 21, 54, 86],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
    },
}

const graph = new Chart(ctx, graphData)

const graphSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/graph/'
)


graphSocket.onmessage = function(respond) {
    let data = JSON.parse(respond.data)
    
    let tempGraphData = graphData.data.datasets[0].data
    tempGraphData.shift()
    tempGraphData.push(data.value)
    graphData.data.datasets[0].data = tempGraphData

    let tempGraphLabels = graphData.data.labels
    tempGraphLabels.shift()
    tempGraphLabels.push(data.month)
    graphData.data.labels = tempGraphLabels

    graph.update()
}

