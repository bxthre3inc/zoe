import UserList from './UserList';
import UserModal from './UserModal';
import SignaturePortal from './SignaturePortal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminView() {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-white">Admin Dashboard</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Hardware fleet, tenant management &amp; system metrics</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/admin/metrics')}
                        className="text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg hover:text-white transition-colors">
                        Metrics
                    </button>
                    <button
                        onClick={() => { setSelectedUser(null); setShowModal(true); }}
                        className="text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors">
                        + New User
                    </button>
                </div>
            </div>

            <UserList onEditUser={(u: any) => { setSelectedUser(u); setShowModal(true); }} />

            {showModal && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setShowModal(false)}
                    onSaved={() => { setShowModal(false); }}
                />
            )}
        </div>
    );
}
