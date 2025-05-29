const histogram_html = '<label class="flex items-center space-x-2 cursor-pointer group"><input id="show_histogram" type="checkbox" class="peer"><span class="text-gray-400 peer-checked:text-gray-900 transition-colors">Show Histogram</span></label><div id="histogram_container" class="histogram bg-gray-100 rounded-2xl hidden" style="padding: 10px;"><div id="chart_content" class="chart-content"><canvas id="histogram" width="400" height="300"></canvas><span id="histogram_delta">\\( \\Delta = 0 \\)</span><br><span id="hsitogram_delta_max">\\( \\Delta_{\\text{max}} = 0 \\)</span></div></div>'

class brng {
    #histogram;
    #histogram_defaults = {
        background_color: 'rgba(153, 102, 255, 0.6)',
        border_color: 'rgba(153, 102, 255, 0)',
        border_width: 0,
    };
    constructor(min, max, delta_max, k_factor, histogram_id="") {
        this.min = parseInt(min.value);
        this.max = parseInt(max.value);
        this.dmax = parseInt(delta_max.value);
        this.kfac = parseFloat(k_factor.value);

        this.dmax_el = delta_max;
        this.kfac_el = k_factor;
        this.min_el = min;
        this.max_el = max;

        this.min_el.addEventListener("change", () => {this.#resetvalues()});
        this.max_el.addEventListener("change", () => {this.#resetvalues()});

        this.values = [];
        this.counts = [];
        this.probabilities = [];

        for (let i = this.min; i <= this.max; i++) {
            this.values.push(i);
            this.counts.push(0);
            this.probabilities.push(0);
        }

        this.delta = 0;
        this.lastindex = 0;
        this.history = [];
        this.hashistogram = histogram_id != "" ? true : false;

        if (this.hashistogram) {
            this.#inithistogram(histogram_id);
        }
    }
    #resetvalues() {
        this.min = parseInt(this.min_el.value);
        this.max = parseInt(this.max_el.value);
        this.dmax = parseInt(this.dmax_el.value);
        this.kfac = parseFloat(this.kfac_el.value);

        this.values = [];
        this.counts = [];
        this.probabilities = [];

        for (let i = this.min; i <= this.max; i++) {
            this.values.push(i);
            this.counts.push(0);
            this.probabilities.push(0);
        }

        this.delta = 0;

        this.#histogram.data.labels = this.values;
        this.#histogram.data.datasets[0].data = this.counts;
        this.#histogram.update();
    }
    #getprobability() {
        let minCount = Math.min(...this.counts);
        let normalized_counts = this.counts.map((x) => {return x - minCount + 1});

        let probabilities_sum = 0;
        let probabilities = normalized_counts.map((x) => {let tMin = Math.min((-(x-1)/this.kfac) + 1, this.dmax); probabilities_sum += tMin; return tMin;});
    
        let normalized_probabilities = probabilities.map((x) => {return x/probabilities_sum;});
        return normalized_probabilities;
    }
    #getresult() {
        let sum = 0;
        let cumulative = this.probabilities.map((x) => {sum += x; return sum});

        let r = Math.random();

        for (let i = 0; i < cumulative.length; i++) {
            if (r < cumulative[i]) {
                this.counts[i]++;
                this.lastindex = i;
                return this.values[i];
            }
        }
    }
    #update_histogram() {
        this.#histogram.data.datasets[0].data = this.counts;
        this.#histogram.data.datasets[0].backgroundColor = this.#histogram.data.datasets[0].data.map((_, i) => {
            if (i === this.lastindex) {
                return 'rgba(85, 0, 255, 0.8)';
            } else {
                return 'rgba(153, 102, 255, 0.6)';
            }
        });
        this.#histogram.update();
    }
    get(idx) {
        if (idx > this.history.length - 1) {
            return '';
        } else {
            return this.history[this.history.length-1-idx]
        }
    }
    generate() {
        this.dmax = parseInt(this.dmax_el.value);
        this.kfac = parseFloat(this.kfac_el.value);

        let minCount = Math.min(...this.counts);
        let maxCount = Math.max(...this.counts);

        this.delta = maxCount - minCount;
        this.probabilities = this.#getprobability();


        this.lastresult = this.#getresult();
        if (this.hashistogram) {this.#update_histogram();}

        this.history.push(this.lastindex);

        return this.lastresult;
    }
    #inithistogram(container_element_id, display_options=this.#histogram_defaults) {
        document.getElementById(container_element_id).innerHTML = histogram_html;
        document.getElementById("show_histogram").addEventListener("change", () => {document.getElementById("histogram_container").classList.toggle("hidden");})
        this.#histogram = new Chart(document.getElementById("histogram").getContext('2d'), {
            type: 'bar',
            data: {
                labels: this.values,
                datasets: [{
                    label: 'Frequency',
                    data: this.counts,
                    backgroundColor: [
                        display_options.background_color
                    ],
                    borderColor: [
                        display_options.border_color
                    ],
                    borderWidth: display_options.border_width,
                    barPercentage: 1.0,
                    categoryPercentage: 1.0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Number',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },  
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Frequency',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                if (Number.isInteger(value)) {
                                    return value;
                                }
                                return '';
                            }
                        }
                    }
                }
            }
        })  
    }
}