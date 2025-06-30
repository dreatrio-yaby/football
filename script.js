class FootballPredictions {
    constructor() {
        this.matches = [];
        this.currentDate = new Date().toISOString().split('T')[0];
        this.init();
    }

    async init() {
        await this.loadMatches();
        this.setupEventListeners();
        this.setDefaultDate();
        this.filterMatchesByDate(this.currentDate);
    }

    async loadMatches() {
        try {
            const response = await fetch('matches_data.json');
            this.matches = await response.json();
        } catch (error) {
            console.error('Error loading matches:', error);
            this.matches = [];
        }
    }

    setupEventListeners() {
        document.getElementById('today-btn').addEventListener('click', () => {
            this.setActiveButton('today-btn');
            this.filterMatchesByDate(this.currentDate);
        });

        document.getElementById('tomorrow-btn').addEventListener('click', () => {
            this.setActiveButton('tomorrow-btn');
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.filterMatchesByDate(tomorrow.toISOString().split('T')[0]);
        });

        document.getElementById('date-picker').addEventListener('change', (e) => {
            this.setActiveButton(null);
            this.filterMatchesByDate(e.target.value);
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('match-modal').addEventListener('click', (e) => {
            if (e.target.id === 'match-modal') {
                this.closeModal();
            }
        });
    }

    setDefaultDate() {
        document.getElementById('date-picker').value = this.currentDate;
    }

    setActiveButton(activeId) {
        document.getElementById('today-btn').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('today-btn').classList.add('bg-gray-200', 'text-gray-700');
        
        document.getElementById('tomorrow-btn').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('tomorrow-btn').classList.add('bg-gray-200', 'text-gray-700');

        if (activeId) {
            const activeBtn = document.getElementById(activeId);
            activeBtn.classList.remove('bg-gray-200', 'text-gray-700');
            activeBtn.classList.add('bg-blue-500', 'text-white');
        }
    }

    filterMatchesByDate(date) {
        const filteredMatches = this.matches.filter(match => match.match_info.match_date === date);
        this.renderMatches(filteredMatches);
    }

    renderMatches(matches) {
        const container = document.getElementById('matches-container');
        
        if (matches.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">Нет матчей на выбранную дату</h3>
                    <p class="text-gray-500">Попробуйте выбрать другую дату</p>
                </div>
            `;
            return;
        }

        container.innerHTML = matches.map(match => this.createMatchCard(match)).join('');
        
        // Add click listeners to match cards
        matches.forEach((match, index) => {
            document.getElementById(`match-${index}`).addEventListener('click', () => {
                this.showMatchDetail(match);
            });
        });
    }

    createMatchCard(match, index) {
        const wdlProbs = match.predictions.target_wdl_home.probabilities;
        const homeOdds = this.probabilityToOdds(wdlProbs['Победа дома']);
        const drawOdds = this.probabilityToOdds(wdlProbs['Ничья']);
        const awayOdds = this.probabilityToOdds(wdlProbs['Поражение дома']);

        return `
            <div id="match-${index}" class="match-card bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="bg-blue-100 p-2 rounded-full">
                            <i class="fas fa-futbol text-blue-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">${match.match_info.league}</h3>
                            <p class="text-sm text-gray-500">${this.formatDate(match.match_info.match_date)} • ${match.match_info.time}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                            <i class="fas fa-robot mr-1"></i>AI Prediction
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between mb-6">
                    <div class="text-center flex-1">
                        <div class="font-semibold text-lg text-gray-800">${match.match_info.home_team}</div>
                        <div class="text-sm text-gray-500 mt-1">Дома</div>
                    </div>
                    <div class="px-4">
                        <div class="text-2xl font-bold text-gray-400">VS</div>
                    </div>
                    <div class="text-center flex-1">
                        <div class="font-semibold text-lg text-gray-800">${match.match_info.away_team}</div>
                        <div class="text-sm text-gray-500 mt-1">В гостях</div>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-3">
                    <div class="odds-box text-center p-3 bg-gray-50 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">1</div>
                        <div class="text-xl font-bold text-blue-600">${homeOdds}</div>
                        <div class="text-xs text-gray-500">${(wdlProbs['Победа дома'] * 100).toFixed(1)}%</div>
                    </div>
                    <div class="odds-box text-center p-3 bg-gray-50 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">X</div>
                        <div class="text-xl font-bold text-green-600">${drawOdds}</div>
                        <div class="text-xs text-gray-500">${(wdlProbs['Ничья'] * 100).toFixed(1)}%</div>
                    </div>
                    <div class="odds-box text-center p-3 bg-gray-50 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">2</div>
                        <div class="text-xl font-bold text-red-600">${awayOdds}</div>
                        <div class="text-xs text-gray-500">${(wdlProbs['Поражение дома'] * 100).toFixed(1)}%</div>
                    </div>
                </div>

                <div class="mt-4 flex items-center justify-between text-sm">
                    <div class="flex space-x-4">
                        ${match.predictions.target_over_2_5.prediction === 1 ? 
                            '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Тотал > 2.5</span>' : 
                            '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Тотал < 2.5</span>'}
                        ${match.predictions.target_both_teams_scored.prediction === 1 ? 
                            '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>ОЗ</span>' : 
                            '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>НЗ</span>'}
                    </div>
                    <div class="text-blue-600 font-medium">
                        Подробнее <i class="fas fa-arrow-right ml-1"></i>
                    </div>
                </div>
            </div>
        `;
    }

    showMatchDetail(match) {
        const modal = document.getElementById('match-modal');
        const title = document.getElementById('modal-title');
        const content = document.getElementById('modal-content');

        title.textContent = `${match.match_info.home_team} vs ${match.match_info.away_team}`;
        content.innerHTML = this.createDetailContent(match);

        modal.classList.remove('hidden');
    }

    createDetailContent(match) {
        const predictions = match.predictions;
        
        return `
            <div class="space-y-6">
                <!-- Match Info -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <h3 class="font-semibold text-lg">${match.match_info.home_team}</h3>
                            <p class="text-sm text-gray-600">Последний матч: ${this.formatDate(match.stats_dates.home_team_last_match)}</p>
                        </div>
                        <div class="flex flex-col items-center justify-center">
                            <div class="text-sm text-gray-600 mb-2">${this.formatDate(match.match_info.match_date)} • ${match.match_info.time}</div>
                            <div class="text-lg font-semibold">${match.match_info.league}</div>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg">${match.match_info.away_team}</h3>
                            <p class="text-sm text-gray-600">Последний матч: ${this.formatDate(match.stats_dates.away_team_last_match)}</p>
                        </div>
                    </div>
                </div>

                <!-- Main Markets -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${this.createMarketCard('Исход матча', predictions.target_wdl_home, 'multi')}
                    ${this.createMarketCard('Тотал голов 2.5', predictions.target_over_2_5)}
                    ${this.createMarketCard('Обе забьют', predictions.target_both_teams_scored)}
                    ${this.createMarketCard('Тотал голов 1.5', predictions.target_over_1_5)}
                    ${this.createMarketCard('Тотал голов 3.5', predictions.target_over_3_5)}
                    ${this.createMarketCard('Дом тотал 2.5', predictions.target_home_over_2_5)}
                </div>

                <!-- Additional Markets -->
                <div class="border-t pt-6">
                    <h3 class="text-lg font-semibold mb-4">Дополнительные рынки</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${predictions.target_corners_over_7_5 ? this.createMarketCard('Угловые > 7.5', predictions.target_corners_over_7_5) : ''}
                        ${predictions.target_corners_over_8_5 ? this.createMarketCard('Угловые > 8.5', predictions.target_corners_over_8_5) : ''}
                        ${predictions.target_away_over_1_5 ? this.createMarketCard('Гости тотал 1.5', predictions.target_away_over_1_5) : ''}
                        ${predictions.target_home_over_1_5 ? this.createMarketCard('Дом тотал 1.5', predictions.target_home_over_1_5) : ''}
                    </div>
                </div>

                <!-- Value Betting Info -->
                <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h3 class="font-semibold text-yellow-800 mb-2">
                        <i class="fas fa-lightbulb mr-2"></i>Как найти value bet
                    </h3>
                    <p class="text-yellow-700 text-sm">
                        Сравните наши коэффициенты с букмекерскими. Если букмекер предлагает коэффициент выше нашего, 
                        это может указывать на недооцененную ставку (value bet). Например, если наш коэффициент 2.0, 
                        а у букмекера 2.5 - это потенциально выгодная ставка.
                    </p>
                </div>
            </div>
        `;
    }

    createMarketCard(title, prediction, type = 'binary') {
        if (!prediction) return '';

        if (type === 'multi' && title === 'Исход матча') {
            const probs = prediction.probabilities;
            return `
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold mb-3">${title}</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm">Победа дома</span>
                            <div class="text-right">
                                <div class="font-bold text-blue-600">${this.probabilityToOdds(probs['Победа дома'])}</div>
                                <div class="text-xs text-gray-500">${(probs['Победа дома'] * 100).toFixed(1)}%</div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm">Ничья</span>
                            <div class="text-right">
                                <div class="font-bold text-green-600">${this.probabilityToOdds(probs['Ничья'])}</div>
                                <div class="text-xs text-gray-500">${(probs['Ничья'] * 100).toFixed(1)}%</div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm">Победа гостей</span>
                            <div class="text-right">
                                <div class="font-bold text-red-600">${this.probabilityToOdds(probs['Поражение дома'])}</div>
                                <div class="text-xs text-gray-500">${(probs['Поражение дома'] * 100).toFixed(1)}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        const yesProb = prediction.probabilities['Да'];
        const noProb = prediction.probabilities['Нет'];
        const recommendedBet = prediction.prediction === 1 ? 'Да' : 'Нет';
        const recommendedOdds = prediction.prediction === 1 ? this.probabilityToOdds(yesProb) : this.probabilityToOdds(noProb);

        return `
            <div class="bg-white border border-gray-200 rounded-lg p-4">
                <h4 class="font-semibold mb-3">${title}</h4>
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="text-sm">Да</span>
                        <div class="text-right">
                            <div class="font-bold ${prediction.prediction === 1 ? 'text-green-600' : 'text-gray-600'}">${this.probabilityToOdds(yesProb)}</div>
                            <div class="text-xs text-gray-500">${(yesProb * 100).toFixed(1)}%</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm">Нет</span>
                        <div class="text-right">
                            <div class="font-bold ${prediction.prediction === 0 ? 'text-green-600' : 'text-gray-600'}">${this.probabilityToOdds(noProb)}</div>
                            <div class="text-xs text-gray-500">${(noProb * 100).toFixed(1)}%</div>
                        </div>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-gray-100">
                    <div class="flex items-center text-xs">
                        <i class="fas fa-robot text-blue-500 mr-1"></i>
                        <span class="text-gray-600">AI рекомендует: <strong>${recommendedBet}</strong> (${recommendedOdds})</span>
                    </div>
                </div>
            </div>
        `;
    }

    closeModal() {
        document.getElementById('match-modal').classList.add('hidden');
    }

    probabilityToOdds(probability) {
        if (probability <= 0) return '∞';
        return (1 / probability).toFixed(2);
    }

    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'short'
        };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new FootballPredictions();
});