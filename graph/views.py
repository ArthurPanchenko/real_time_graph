from django.shortcuts import render


def graph(request):
    return render(request, 'graph/graph.html')