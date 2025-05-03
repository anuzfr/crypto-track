export default function RefreshButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        🔄 Refresh Now
      </button>
    );
  }