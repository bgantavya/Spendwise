import { useEffect, useMemo, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { fetchTransactions, fetchBudget, addTransaction,setBudget, deleteTransaction,  } from '../api';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Filler
} from 'chart.js';
import { AdivisorAI } from '../api';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Filler
);

// -----------------------------------------------------------------------

// --- ICONS ---
const Icons = {
    Housing: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    Food: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>,
    Transportation: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M15 17h2"/></svg>,
    Entertainment: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/></svg>,
    Utilities: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/><path d="M12 2v8"/></svg>,
    Other: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
    Plus: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
    Trash: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
    Wallet: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>,
    TrendingUp: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    TrendingDown: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>,
    LogOut: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
    LightBulb: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
    X: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

export default function Dashboard({ onLogOut }) {
    const [allTransactions, setAllTransactions] = useState([]);
    const [budget, setBudgetState] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const [activeChartTab, setActiveChartTab] = useState('overview');
    
    // Advisor State
    const [advice, setAdvice] = useState(null);
    const [adviceLoading, setAdviceLoading] = useState(false);

    const [form, setForm] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category: 'Food'
    });

    // Filter transactions based on selected month
    const transactions = useMemo(() => {
        return allTransactions.filter(t => t.timestamp && t.timestamp.startsWith(filterMonth));
    }, [allTransactions, filterMonth]);

    // --- CALCULATIONS ---
    const { totalIncome, totalExpenses, balance } = useMemo(() => {
        let income = 0, expenses = 0;
        transactions.forEach(t => {
            if (t.type === 'income') income += t.amount;
            else expenses += t.amount;
        });
        return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
    }, [transactions]);

    const budgetProgress = useMemo(() => {
        if (budget <= 0) return 0;
        return Math.min((totalExpenses / budget) * 100, 100);
    }, [totalExpenses, budget]);

    // --- INITIAL LOAD ---
    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const [txs, b] = await Promise.all([fetchTransactions(), fetchBudget()]);
                const formattedTxs = (Array.isArray(txs) ? txs : []).map(t => ({
                    ...t,
                    timestamp: new Date(t.timestamp).toISOString()
                }));
                setAllTransactions(formattedTxs);
                setBudgetState(b?.amount || 0);
            } catch (e) {
                console.error("Failed to load data", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // --- ACTIONS ---
    async function handleQuickAdd(preset) {
        try {
            setLoading(true);
            const newTransaction = {
                ...preset,
                timestamp: new Date().toISOString(),
            };
            const result = await addTransaction(newTransaction);
            setAllTransactions(prev => [...prev, { ...result, timestamp: new Date(result.timestamp).toISOString() }]);
            setMessage({ text: 'Transaction added!', type: 'success' });
        } catch (error) {
            setMessage({ text: 'Failed to add transaction', type: 'error' });
        } finally {
            setLoading(false);
        }
    }
    const [message, setMessage] = useState(null);
    async function handleAdd(e) {
        e.preventDefault();
        const amount = parseFloat(form.amount);
        if (!form.description || isNaN(amount) || amount <= 0) {
            setMessage({ text: 'Please fill all fields correctly', type: 'error' });
            return;
        }
        try {
            const created = await addTransaction({ ...form, amount });
            if (created?._id) {
                setAllTransactions(prev => [created, ...prev]);
                setForm({ description: '', amount: '', type: 'expense', category: 'Food' });
            }
        } catch (e) { alert("Failed to add transaction"); }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this transaction?")) return;
        try {
            await deleteTransaction(id);
            setAllTransactions(prev => prev.filter(t => t._id !== id));
        } catch (e) { alert("Failed to delete"); }
    }

    async function handleSetBudget() {
        const input = prompt('Set monthly budget target (₹):', `${budget || 0}`);
        if (input === null) return;
        const amount = parseFloat(input);
        if (isNaN(amount) || amount < 0) return;
        try {
            const b = await setBudget(amount);
            setBudgetState(b?.amount || 0);
        } catch (e) { alert("Failed to set budget"); }
    }

    async function handleGetAdvice() {
        setAdviceLoading(true);
        setAdvice(null); // Clear previous advice while loading
        try {
            const response = await AdivisorAI();
            console.log(response)
            setAdvice(response.advice);
        } catch (error) {
            setAdvice("Sorry, I couldn't generate advice at this moment.");
        } finally {
            setAdviceLoading(false);
        }
    }

    // --- CHART DATA PREPARATION ---
    const chartOptionsCommon = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { usePointStyle: true, font: { family: 'Inter, sans-serif', size: 12 } } },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleFont: { family: 'Inter, sans-serif', size: 13 },
                bodyFont: { family: 'Inter, sans-serif', size: 12 },
                padding: 10,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { family: 'Inter, sans-serif' } } },
            y: { grid: { color: '#f3f4f6' }, ticks: { font: { family: 'Inter, sans-serif' } } }
        }
    };

    const pieData = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const byCategory = expenses.reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});
        return {
            labels: Object.keys(byCategory).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
            datasets: [{
                data: Object.values(byCategory),
                backgroundColor: ['#818cf8', '#34d399', '#f87171', '#fbbf24', '#a78bfa', '#fb923c'],
                borderWidth: 0,
                hoverOffset: 15
            }]
        };
    }, [transactions]);

    const lineData = useMemo(() => {
        const sorted = [...transactions].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        let runningBalance = 0;
        const dataPoints = sorted.map(t => {
            runningBalance += t.type === 'income' ? t.amount : -t.amount;
            return runningBalance;
        });

        return {
            labels: sorted.map(t => new Date(t.timestamp).toLocaleDateString([], { day: '2-digit', month: 'short' })),
            datasets: [{
                label: 'Net Balance',
                data: dataPoints,
                borderColor: '#6366f1',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(99,102,241,0.4)');
                    gradient.addColorStop(1, 'rgba(99,102,241,0.0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6
            }]
        };
    }, [transactions]);

    const barData = useMemo(() => {
        const days = {};
        transactions.forEach(t => {
            const day = new Date(t.timestamp).getDate();
            if (!days[day]) days[day] = { income: 0, expense: 0 };
            days[day][t.type] += t.amount;
        });
        const labels = Object.keys(days).sort((a, b) => Number(a) - Number(b));
        return {
            labels: labels,
            datasets: [
                { label: 'Income', data: labels.map(d => days[d].income), backgroundColor: '#34d399', borderRadius: 4 },
                { label: 'Expense', data: labels.map(d => days[d].expense), backgroundColor: '#f87171', borderRadius: 4 }
            ]
        };
    }, [transactions]);


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div>
                <div className="text-gray-400 font-medium">Loading Dashboard...</div>
            </div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
            {/* --- HEADER --- */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                            <Icons.Wallet className="text-white h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Finance Dashboard
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium">Welcome back, overview for {new Date(filterMonth).toLocaleDateString([], { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            onClick={handleGetAdvice}
                            disabled={adviceLoading}
                            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-all active:scale-95 disabled:opacity-70"
                        >
                            {adviceLoading ? (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <Icons.LightBulb className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">Get Advice</span>
                        </button>
                         <input
                            type="month"
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                            className="input-base py-2 px-3 text-sm"
                        />
                        <button onClick={onLogOut} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100">
                            <Icons.LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">LogOut</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* --- ADVICE SECTION (Conditionally Rendered) --- */}
                {advice && (
                    <div className="animate-fade-in-up bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-4 rounded-2xl relative flex items-start gap-4 shadow-sm">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-xl flex-shrink-0">
                            <Icons.LightBulb className="h-6 w-6" />
                        </div>
                        <div className="flex-1 pr-8">
                            <h3 className="font-bold text-amber-800 mb-1">Advisor Insight</h3>
                            <p className="text-amber-900 text-sm leading-relaxed">{advice}</p>
                        </div>
                        <button 
                            onClick={() => setAdvice(null)} 
                            className="absolute top-4 right-4 text-amber-400 hover:text-amber-700 transition-colors"
                        >
                            <Icons.X className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {/* --- SUMMARY CARDS --- */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
                    <SummaryCard title="Total Balance" amount={balance} type="neutral" icon={Icons.Wallet} />
                    <SummaryCard title="Monthly Income" amount={totalIncome} type="income" icon={Icons.TrendingUp} />
                    <SummaryCard title="Monthly Expenses" amount={totalExpenses} type="expense" icon={Icons.TrendingDown} />
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* --- LEFT COLUMN (Charts & Budget) --- */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* BUDGET PROGRESS */}
                        <section className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-semibold text-slate-700">Monthly Budget</h3>
                                    <div className="text-sm">
                                        <span className={`font-bold ${budgetProgress > 100 ? 'text-red-500' : 'text-slate-700'}`}>
                                            ₹{totalExpenses.toFixed(0)}
                                        </span>
                                        <span className="text-slate-400"> / ₹{budget.toFixed(0)}</span>
                                    </div>
                                </div>
                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-1000 ease-out rounded-full ${
                                            budgetProgress > 90 ? 'bg-red-500' : budgetProgress > 75 ? 'bg-amber-400' : 'bg-indigo-500'
                                        }`}
                                        style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                                    />
                                </div>
                            </div>
                            <button onClick={handleSetBudget} className="btn-secondary self-start sm:self-center whitespace-nowrap">
                                Edit Budget
                            </button>
                        </section>

                        {/* CHARTS AREA */}
                        <section className="card p-1 sm:p-2">
                            <div className="flex border-b border-slate-100 px-4 pt-4 overflow-x-auto no-scrollbar">
                                {['overview', 'trends', 'breakdown'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveChartTab(tab)}
                                        className={`pb-3 px-4 text-sm font-semibold capitalize transition-all relative ${
                                            activeChartTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        {tab}
                                        {activeChartTab === tab && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="p-4 h-80 sm:h-96 relative">
                                {activeChartTab === 'overview' && <Line data={lineData} options={chartOptionsCommon} />}
                                {activeChartTab === 'trends' && <Bar data={barData} options={chartOptionsCommon} />}
                                {activeChartTab === 'breakdown' && (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="w-full max-w-md h-full">
                                            <Pie data={pieData} options={{...chartOptionsCommon, plugins: { ...chartOptionsCommon.plugins, legend: { position: 'right' }}}} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* --- RIGHT COLUMN (Actions & History) --- */}
                    <div className="space-y-8">
                     
                           <section className="card p-5 sm:p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-indigo-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Icons.Plus className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-lg font-bold">Quick Add</h2>
                            </div>

                            <form onSubmit={handleAdd} className="space-y-4">
                                {/* Segmented Toggle for Type */}
                                <div className="flex bg-black/10 p-1 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => setForm(f => ({ ...f, type: 'expense' }))}
                                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${form.type === 'expense' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/70 hover:text-white'}`}
                                    >
                                        Expense
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setForm(f => ({ ...f, type: 'income' }))}
                                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${form.type === 'income' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/70 hover:text-white'}`}
                                    >
                                        Income
                                    </button>
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        placeholder="Amount (₹)"
                                        className="input-glass w-full text-lg font-semibold"
                                        min="0.01" step="0.01" required
                                        value={form.amount}
                                        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Description (e.g., Lunch, Salary)"
                                    className="input-glass w-full"
                                    required
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                />

                                <div className="flex gap-3">
                                    <select
                                        className="input-glass flex-1"
                                        value={form.category}
                                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                    >
                                        {['housing', 'food', 'transportation', 'entertainment', 'utilities', 'other'].map(c => (
                                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center">
                                        <Icons.Plus className="h-5 w-5 sm:hidden" />
                                        <span className="hidden sm:inline">Add</span>
                                    </button>
                                </div>
                            </form>
                        </section>

                        {/* RECENT TRANSACTIONS */}
                        <section className="card h-[500px] flex flex-col">
                            <div className="p-5 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl">
                                <h2 className="font-bold text-slate-700">Transactions</h2>
                                <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full">
                                    {transactions.length} items
                                </span>
                            </div>
                            <div className="overflow-y-auto flex-1 p-3 custom-scrollbar">
                                {transactions.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                                        <Icons.Wallet className="h-12 w-12 opacity-50" />
                                        <p>No transactions for this month.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-2">
                                        {transactions.map(t => (
                                            <TransactionItem key={t._id} t={t} onDelete={handleDelete} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
             {/* Global styles for custom scrollbar and animations that Tailwind doesn't provide out of the box cleanly */}
             <style>{`
                .card { @apply bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50 transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]; }
                .input-base { @apply bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all; }
                .input-glass { @apply bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm rounded-xl focus:bg-white/20 focus:border-white/40 outline-none transition-all py-3 px-4; }
                .input-glass option { @apply text-slate-800 bg-white; }
                .btn-secondary { @apply py-2 px-4 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all text-sm; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full hover:bg-slate-300; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function SummaryCard({ title, amount, type, icon: Icon }) {
    const colors = {
        neutral: 'bg-white text-indigo-600',
        income: 'bg-emerald-50 text-emerald-600',
        expense: 'bg-rose-50 text-rose-600',
    };
    const iconColors = {
        neutral: 'bg-indigo-100 text-indigo-600',
        income: 'bg-emerald-100 text-emerald-600',
        expense: 'bg-rose-100 text-rose-600',
    }

    return (
        <div className={`card p-6 flex items-center gap-4 ${type !== 'neutral' ? 'border-0' : ''} ${colors[type].split(' ')[0]}`}>
            <div className={`p-3 rounded-xl ${iconColors[type]}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <p className={`text-2xl sm:text-3xl font-bold ${colors[type].split(' ')[1]}`}>
                    ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        </div>
    );
}

function TransactionItem({ t, onDelete }) {
    const Icon = Icons[t.category] || Icons.Other;
    const isIncome = t.type === 'income';

    return (
        <li className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors relative">
            <div className={`p-2.5 rounded-lg ${isIncome ? 'bg-emerald-100/50 text-emerald-600' : 'bg-rose-100/50 text-rose-600'}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-700 truncate">{t.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                     <span className="capitalize">{t.category}</span>
                     <span>•</span>
                     <span>{new Date(t.timestamp).toLocaleDateString([], { day: 'numeric', month: 'short' })}</span>
                </div>
            </div>
            <div className={`font-bold whitespace-nowrap ${isIncome ? 'text-emerald-600' : 'text-slate-700'}`}>
                {isIncome ? '+' : '-'} ₹{Number(t.amount).toLocaleString('en-IN')}
            </div>
             <button
                onClick={() => onDelete(t._id)}
                className="absolute right-2 p-2 bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                title="Delete transaction"
            >
                <Icons.Trash className="h-4 w-4" />
            </button>
        </li>
    );
}