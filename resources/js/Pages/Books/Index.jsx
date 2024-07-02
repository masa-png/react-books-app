import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import BlueButton from "@/Components/BlueButton";
import GreenButton from "@/Components/GreenButton";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import SelectBox from "@/Components/SelectBox";
import { useForm } from "@inertiajs/react";

export default function Index({ auth, books }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const titleInput = useRef();
    const contentInput = useRef();
    const categoryInput = useRef();

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
                    <BlueButton onClick={confirmUserDeletion}>登録</BlueButton>

                    <Modal show={confirmingUserDeletion} onClose={closeModal}>
                        <form onSubmit={deleteUser} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                新しい本を追加しますか?
                            </h2>

                            <p className="mt-1 text-sm text-gray-600"></p>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="text"
                                    value="title"
                                    className="sr-only"
                                />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    ref={titleInput}
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="タイトル"
                                ></TextInput>

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="text"
                                    value="content"
                                    className="sr-only"
                                />

                                <TextareaInput
                                    id="content"
                                    type="text"
                                    name="content"
                                    ref={contentInput}
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    placeholder="内容"
                                ></TextareaInput>

                                <InputError
                                    message={errors.content}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6">
                                <SelectBox
                                    name="category"
                                    id="category"
                                    ref={categoryInput}
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="mt-1"
                                    options={["", "React", "Vue", "Laravel"]}
                                ></SelectBox>

                                <InputError
                                    message={errors.category}
                                    className="mt-2"
                                ></InputError>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    キャンセル
                                </SecondaryButton>

                                <BlueButton
                                    className="ml-3"
                                    disabled={processing}
                                >
                                    登録
                                </BlueButton>
                            </div>
                        </form>
                    </Modal>

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
