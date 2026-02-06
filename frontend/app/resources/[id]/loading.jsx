export default function ArticleLoading() {
    return (
        <main className="min-h-screen bg-white pb-20 mt-16">
            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Back Button Skeleton */}
                <div className="flex items-center justify-between mb-8">
                    <div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div>
                    <div className="flex gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-full animate-pulse"></div>
                        <div className="w-9 h-9 bg-slate-100 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Hero Skeleton */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse"></div>
                            <div className="h-4 w-20 bg-slate-50 rounded animate-pulse"></div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="h-10 w-full bg-slate-100 rounded animate-pulse"></div>
                            <div className="h-10 w-3/4 bg-slate-100 rounded animate-pulse"></div>
                        </div>

                        <div className="h-6 w-2/3 bg-slate-50 rounded animate-pulse mb-10"></div>

                        <div className="rounded-4xl bg-slate-100 aspect-video md:aspect-[21/9] animate-pulse"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="max-w-3xl mx-auto space-y-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-4 w-full bg-slate-50 rounded animate-pulse"></div>
                                <div className="h-4 w-full bg-slate-50 rounded animate-pulse"></div>
                                <div className="h-4 w-5/6 bg-slate-50 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
