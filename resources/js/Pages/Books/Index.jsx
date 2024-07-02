import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function Index({ auth, books }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Books
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DangerButton onClick={confirmUserDeletion}>
                        Delete Account
                    </DangerButton>

                    <div>
                        <table className="w-full bg-gray-100 mt-2">
                            <thead className="bg-blue-100">
                                <tr className="text-green-600">
                                    <th className="px-2 py-2 border border-gray-400">
                                        #
                                    </th>
                                    <th className="px-2 py-2 border border-gray-400">
                                        Title
                                    </th>
                                    <th className="px-2 py-2 border border-gray-400">
                                        Content
                                    </th>
                                    <th className="px-2 py-2 border border-gray-400">
                                        Category
                                    </th>
                                    <th className="px-2 py-2 border border-gray-400"></th>
                                    <th className="px-2 py-2 border border-gray-400"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="border border-gray-400 px-2 py-2 text-center">
                                            {book.id}
                                        </td>
                                        <td className="border border-gray-400 px-2 py-2">
                                            {book.title}
                                        </td>
                                        <td className="border border-gray-400 px-2 py-2">
                                            {book.content}
                                        </td>
                                        <td className="border border-gray-400 px-2 py-2">
                                            {book.category}
                                        </td>
                                        <td className="border border-gray-400 px-2 py-2 text-center"></td>
                                        <td className="border border-gray-400 px-2 py-2 text-center"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
