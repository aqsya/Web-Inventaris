export default async function Home() {
    return (
        <div className="space-y-8">
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Selamat Datang!</h1>
                        <p className="text-blue-100 text-lg">
                            Dashboard Sistem Inventaris Maju Jaya
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
