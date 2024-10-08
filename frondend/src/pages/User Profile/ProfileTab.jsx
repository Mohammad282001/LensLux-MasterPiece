import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Edit2, Save, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../layouts/navbar/Navbar';

// Individual InputField Component
const InputField = ({ name, label, icon, type, value, onChange, disabled, onEditToggle }) => (
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black block w-full pl-10 pr-10 py-2 sm:text-sm border-2 rounded-md transition-all duration-300 ${disabled ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-black'}`}
                aria-label={label}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <motion.button
                    type="button"
                    onClick={onEditToggle}
                    className={`text-gray-400 hover:text-black transition-colors duration-300 ${disabled ? '' : 'text-black'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Edit2 className="h-5 w-5" />
                </motion.button>
            </div>
        </div>
    </div>
);

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onEditToggle: PropTypes.func.isRequired,
};

const ProfileTab = ({ user, editingFields, toggleEditing, handleInputChange, handleSubmit, loading }) => (
    <>

    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3">
                <InputField
                    name="first_name"
                    label="First Name"
                    icon={<User className="h-5 w-5 text-gray-400" />}
                    value={user.first_name || ''}
                    onChange={handleInputChange}
                    disabled={!editingFields.first_name}
                    onEditToggle={() => toggleEditing('first_name')}
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <InputField
                    name="last_name"
                    label="Last Name"
                    icon={<User className="h-5 w-5 text-gray-400" />}
                    value={user.last_name || ''}
                    onChange={handleInputChange}
                    disabled={!editingFields.last_name}
                    onEditToggle={() => toggleEditing('last_name')}
                />
            </div>
        </div>

        <InputField
            name="email"
            label="Email"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            type="email"
            value={user.email || ''}
            onChange={handleInputChange}
            disabled={!editingFields.email}
            onEditToggle={() => toggleEditing('email')}
        />
        <InputField
            name="phone_number"
            label="Phone"
            icon={<Phone className="h-5 w-5 text-gray-400" />}
            type="tel"
            value={user.phone_number || ''}
            onChange={handleInputChange}
            disabled={!editingFields.phone_number}
            onEditToggle={() => toggleEditing('phone_number')}
        />
        <InputField
            name="date_of_birth"
            label="Date of Birth"
            icon={<Calendar className="h-5 w-5 text-gray-400" />}
            type="date"
            value={user.date_of_birth || ''}
            onChange={handleInputChange}
            disabled={!editingFields.date_of_birth}
            onEditToggle={() => toggleEditing('date_of_birth')}
        />

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Face Shape</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md border-2 border-gray-200">
                {user.face_shape ? (
                    <p className="text-gray-900 font-medium">{user.face_shape}</p>
                ) : (
                    <div className="flex items-center text-yellow-600">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>
                            Face shape not set.
                            <Link to="/frame-finder" className="ml-2 text-blue-600 hover:underline font-medium">
                                Find your face shape
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>

        <div className="mt-8 flex justify-end">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-300`}
                disabled={loading}
            >
                <Save className="h-5 w-5 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
            </motion.button>
        </div>
    </form>
    </>
);

ProfileTab.propTypes = {
    user: PropTypes.object.isRequired,
    editingFields: PropTypes.object.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ProfileTab;
