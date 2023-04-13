import React, {forwardRef, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import useGetRole from "../../client/api/queries/getRole/useGetRole";
import useCreateVoting from "../../client/api/mutations/createVoting/useCreateVoting";
import useAddVoter from "../../client/api/mutations/addVoter/useAddVoter";
import useModifyVoter from "../../client/api/mutations/modifyVoter/useModifyVoter";
import useDeleteVoter from "../../client/api/mutations/deleteVoter/useDeleteVoter";
import {Button, Label, TextInput} from "flowbite-react/lib/esm/components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ReactComponent as PlusIcon} from "../../assets/icons/Plus.svg";
import {ReactComponent as MinusIcon} from "../../assets/icons/Minus.svg";


const Voting = () => {
    const {account} = useWeb3React();
    const navigate = useNavigate();
    const {isSuccess, data: access} = useGetRole({
        accountAddress: account || ''
    }, {enabled: !!account})

    const [creatingVoting, setCreatingVoting] = useState({
        name: '',
        duration: new Date(),
        options: ['', ''],
        description: '',
        group: '',
    });
    const [addVoter, setAddVoter] = useState({
        address: '',
        group: '',
    });
    const [modifyVoter, setModifyVoter] = useState({
        address: '',
        group: '',
    });
    const [deleteVoter, setDeleteVoter] = useState('');

    const { mutateAsync: createVotingAsync } = useCreateVoting({
        accountAddress: account || ''
    });
    const { mutateAsync: addVoterAsync } = useAddVoter({
        accountAddress: account || ''
    });
    const { mutateAsync: modifyVoterAsync } = useModifyVoter({
        accountAddress: account || ''
    });
    const { mutateAsync: deleteVoterAsync } = useDeleteVoter({
        accountAddress: account || ''
    });

    useEffect(() => {
        if (!access) {
            navigate('/');
        }
    }, [isSuccess, access])

    const handelChangeCreateVoting = (event: any, type: string) => {
        setCreatingVoting(prevState => {
            const newDate = {
                [type]:  event.target.value
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeDatePicker = (event: string) => {
        setCreatingVoting(prevState => {
            const newDate = {
                'duration':  new Date(event)
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeOptions = (event: any, index: number) => {
        setCreatingVoting(prevState => {
            const newOption = prevState.options;
            // @ts-ignore
            newOption[index] = event.target.value;
            const newDate = {
                'options':  newOption
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeAddVoting = (event: any, type: string) => {
        setAddVoter(prevState => {
            const newDate = {
                [type]:  event.target.value
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeModifyVoting = (event: any, type: string) => {
        setModifyVoter(prevState => {
            const newDate = {
                [type]:  event.target.value
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeDeleteVoting = (event: any) => {
        setDeleteVoter(event.target.value)
    }
    const handelCreateVoting = async () => {
        const res = await createVotingAsync({
            name: creatingVoting.name,
            optionsData: creatingVoting.options,
            duration: Math.floor((new Date(creatingVoting.duration).getTime() - new Date().getTime()) / 1000),
            description: creatingVoting.description,
            group: creatingVoting.group,
            accountAddress: account || ''
        })
        console.log(res,'----')
    }
    const handelAddVoter = async () => {
        const res = await addVoterAsync({
            voterAddress: addVoter.address,
            group: addVoter.group,
            accountAddress: account || ''
        })
        setAddVoter({
            address: '',
            group: ''
        })
        console.log(res,'----')
    }
    const handelModifyVoter = async () => {
        const res = await modifyVoterAsync({
            voterAddress: modifyVoter.address,
            group: modifyVoter.group,
            accountAddress: account || ''
        })
        setModifyVoter({
            address: '',
            group: ''
        })
        console.log(res,'----')
    }
    const handelDeleteVoter = async () => {
        const res = await deleteVoterAsync({
            voterAddress: deleteVoter,
            accountAddress: account || ''
        })
        setDeleteVoter('')
        console.log(res,'----')
    }

    const DatePickerInput = forwardRef(({ value, onClick }: any, ref:React.ForwardedRef<any>) => (
        <TextInput
            onClick={onClick}
            ref={ref}
            type="text"
            id="votingDuration"
            placeholder="Duration"
            value={value || ''}
            readOnly
        />
    ));
    const addOptions = () => {
        setCreatingVoting(prevState => {
            const newData = {
                options:  [...prevState.options, '']
            };
            return {...prevState, ...newData}
        })    }
    const removeOptions = (index: number) => {
        setCreatingVoting(prevState => {
            const newData = prevState.options;
            newData.splice(index, 1);
            return {...prevState, options: newData}
        })
    }
    return (
        <div className={"flex flex-col px-4"}>
            <div className={'grid grid-rows-2 grid-flow-col gap-4'}>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Create Voting</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="relative mb-3" data-te-input-wrapper-init="">
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingName"
                                        value="Name"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="votingName"
                                    placeholder="Name"
                                    value={creatingVoting.name || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'name');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingDuration"
                                        value="End Date"
                                    />
                                </div>
                                <DatePicker
                                    selected={new Date(creatingVoting.duration)}
                                    onChange={(date: any) => handelChangeDatePicker(date)}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    customInput={ <DatePickerInput/> }
                                />
                            </div>
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingOption"
                                        value="Options"
                                    />
                                </div>
                                <div className={'flex flex-col gap-1'}>
                                    {creatingVoting.options.map((item, index) =>
                                        <div key={index} className={'flex gap-2'}>
                                            <TextInput
                                                type="text"
                                                className={'w-full'}
                                                id="votingOption"
                                                placeholder={`Option ${index + 1}`}
                                                value={item || ''}
                                                onChange={(e: any) => {
                                                    handelChangeOptions(e, index);
                                                }}
                                            />

                                            {
                                                creatingVoting.options.length > 2 ?
                                                <button className={'bg-gray-100 px-2 py-1 rounded-lg'} onClick={() => removeOptions(index)}>
                                                    <MinusIcon className={'w-5 stroke-red-500'} />
                                                </button> : null
                                            }
                                        </div>)}
                                    <div className={'flex justify-end'}>
                                        <Button
                                            className={'w-auto p-0 mt-2 '}
                                            color="gray"
                                            onClick={addOptions}
                                        >
                                            <PlusIcon className={'w-5 stroke-cyan-500'}/>
                                        </Button>

                                    </div>

                                </div>
                            </div>
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingDescription"
                                        value="Description"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="votingDescription"
                                    placeholder="Description"
                                    value={creatingVoting.description || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'description');
                                    }}
                                />
                            </div>
                            <div className={'mb-4'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="groupVoting"
                                        value="Group"
                                    />
                                </div>
                                <TextInput
                                    type="number"
                                    id="groupVoting"
                                    placeholder="Group"
                                    value={creatingVoting.group || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'group');
                                    }}
                                />
                            </div>
                            <div>
                                <Button gradientMonochrome="success"
                                        disabled={!(creatingVoting.name && creatingVoting.options && creatingVoting.duration && creatingVoting.group && creatingVoting.duration)}
                                        onClick={handelCreateVoting}
                                        className={'w-full'}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Add Voter</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="relative mb-3" data-te-input-wrapper-init="">
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="addVoter"
                                        value="Voter"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="addVoter"
                                    placeholder="Voter"
                                    value={addVoter.address || ''}
                                    onChange={(e:any) => handelChangeAddVoting(e,'address')}
                                />
                            </div>
                            <div className={'mb-4'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="addVoterGroup"
                                        value="Group"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="addVoterGroup"
                                    placeholder="Group"
                                    value={addVoter.group || ''}
                                    onChange={(e:any) => handelChangeAddVoting(e,'group')}
                                />
                            </div>
                            <div>
                                <Button
                                    gradientMonochrome="success"
                                    className={'w-full'}
                                    onClick={handelAddVoter}
                                    disabled={!(addVoter.group && addVoter.address)}
                                >
                                    Add Voter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Modify Voter</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="relative mb-3" data-te-input-wrapper-init="">
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="modifyVoter"
                                        value="Voter"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="modifyVoter"
                                    placeholder="Voter"
                                    value={modifyVoter.address || ''}
                                    onChange={(e:any) => handelChangeModifyVoting(e,'address')}
                                />
                            </div>
                            <div className={'mb-4'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="modifyNewVoter"
                                        value="New Group"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="modifyNewVoter"
                                    placeholder="New Group"
                                    value={modifyVoter.group || ''}
                                    onChange={(e:any) => handelChangeModifyVoting(e,'group')}
                                />
                            </div>
                            <div>
                                <Button
                                    gradientMonochrome="success"
                                    className={'w-full'}
                                    onClick={handelModifyVoter}
                                    disabled={!(modifyVoter.group && modifyVoter.address)}
                                >
                                    Change Group
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Remove Voter</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                       <div className="relative mb-3" data-te-input-wrapper-init="">
                                <div className={'mb-4'}>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="removeVoter"
                                            value="Voter"
                                        />
                                    </div>
                                    <TextInput
                                        type="text"
                                        id="removeVoter"
                                        placeholder="Voter"
                                        value={deleteVoter || ''}
                                        onChange={(e:any) => handelChangeDeleteVoting(e)}
                                    />
                                </div>
                                <div>
                                    <Button
                                        color="failure"
                                        className={'w-full'}
                                        onClick={handelDeleteVoter}
                                        disabled={!deleteVoter}
                                    >
                                        Remove Voter
                                    </Button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Voting;
