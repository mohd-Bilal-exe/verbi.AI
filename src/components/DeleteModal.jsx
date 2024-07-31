import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteCurrentChat } from "../Redux/Actions";
import { m } from "framer-motion";
import { Check } from "@phosphor-icons/react";

export default function DeleteModal({ setDeleteModalOpen, deleteId, setSidebarOpen }) {
    const isDarkMode = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();
    const [isConfirming, setIsConfirming] = useState(false);

    const handleConfirm = () => {
        setIsConfirming(true);
        dispatch(deleteCurrentChat(deleteId));
        setTimeout(() => {
            setDeleteModalOpen(false);
            setSidebarOpen(true);
        }, 150);
    };

    const handleCancel = () => {
        setDeleteModalOpen(false);
    };

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 backdrop-blur-lg grid place-items-center  z-50"
        >
            <m.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className={`w-11/12 max-w-md p-6 rounded-xl flex flex-col gap-4 ${isDarkMode
                    ? "bg-backgroundLight/10 text-copy"
                    : "bg-backgroundLight/80 text-copyLight"
                    } shadow-lg`}
            >
                <h2 className="text-2xl font-semibold">
                    Are you sure you want to delete this chat?
                </h2>
                <p className="text-sm font-medium tracking-wide">
                    This action cannot be undone. <br /> All messages in this chat will be permanently deleted.
                </p>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleCancel}
                        className={`flex-1 p-2 rounded-lg border transition-all ${isDarkMode
                            ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                            : "bg-gray-200 hover:bg-gray-300 border-gray-300"
                            }`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`flex-1 p-2 rounded-lg border transition-all ${isDarkMode
                            ? "bg-red-600 hover:bg-red-700 border-red-700"
                            : "bg-red-500 hover:bg-red-600 border-red-600 text-white"
                            }`}
                    >
                        {isConfirming ? (
                            <Check />
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </m.div>
        </m.div>
    );
}
DeleteModal.propTypes = {
    setSidebarOpen: PropTypes.func.isRequired,
    setDeleteModalOpen: PropTypes.func.isRequired,
    deleteId: PropTypes.string.isRequired,
};