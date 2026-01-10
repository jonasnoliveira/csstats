
export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0b10] text-[#f8fafc]">
            <div className="w-16 h-16 border-4 border-[#8b5cf6] border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-bold font-['Outfit'] animate-pulse">CARREGANDO SQUAD...</h2>
            <p className="text-sm text-[#94a3b8] mt-2">Buscando dados no csstats.gg (Isso pode levar alguns segundos)</p>
        </div>
    );
}
