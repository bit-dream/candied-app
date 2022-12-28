const Table = () => {
    return
        <div className='inline-block min-w-full overflow-y-scroll align-middle shadow-2xl shadow-black rounded-lg border border-slate-600'>
            <table className="text-white min-w-full">
                <thead>
                <tr>
                    <th className='border border-slate-600 bg-slate-600 sticky'>Song</th>
                    <th className='border border-slate-600 bg-slate-600'>Artist</th>
                    <th className='border border-slate-600 bg-slate-600'>Year</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className='border border-slate-900 bg-slate-900 hover:bg-yellow-200'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td className='border border-slate-900 bg-slate-900'>Malcolm Lockyer</td>
                    <td className='border border-slate-900 bg-slate-900'>1961</td>
                </tr>
                </tbody>
            </table>
        </div>
}
export default Table;