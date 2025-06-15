
import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Heart, UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    allergies: '',
    chronicConditions: '',
    emergencyContact: '',
    medicalHistory: '',
    height: '',
    weight: ''
  });
  const { toast } = useToast();

  const fetchUserProfile = async (userId: string) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      toast({
        title: 'Error fetching profile',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
    return profile;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        return toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
      }

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        if (profile) {
          const userData = {
            id: data.user.id,
            email: data.user.email,
            name: profile.name || formData.name,
            phone: profile.phone,
            healthProfile: {
              age: profile.age,
              gender: profile.gender,
              bloodGroup: profile.blood_group,
              allergies: profile.allergies,
              chronicConditions: profile.chronic_conditions,
              emergencyContact: profile.emergency_contact,
              medicalHistory: profile.medical_history,
              height: profile.height,
              weight: profile.weight,
            }
          };
          onLoginSuccess(userData);
          onClose();
        }
      }
    } else {
      // Sign up
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
          },
        },
      });

      if (error) {
        return toast({
          title: 'Sign Up Failed',
          description: error.message.includes('User already registered')
            ? 'This email is already connected to an account.'
            : error.message,
          variant: 'destructive',
        });
      }
      
      if (data.user) {
        toast({
          title: 'Account Created!',
          description: "Please complete your health profile. You may need to confirm your email to log in.",
        });
        setShowHealthForm(true);
      }
    }
  };

  const handleHealthFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return toast({
        title: 'Authentication Error',
        description: 'You must be logged in to update your health profile.',
        variant: 'destructive',
      });
    }

    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update({
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender,
        blood_group: formData.bloodGroup,
        allergies: formData.allergies,
        chronic_conditions: formData.chronicConditions,
        emergency_contact: formData.emergencyContact,
        medical_history: formData.medicalHistory,
        height: formData.height ? parseInt(formData.height) : null,
        weight: formData.weight ? parseInt(formData.weight) : null,
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return toast({
        title: 'Profile Update Failed',
        description: error.message,
        variant: 'destructive',
      });
    }

    if (updatedProfile) {
      const userData = {
        id: user.id,
        email: user.email,
        name: updatedProfile.name,
        phone: updatedProfile.phone,
        healthProfile: {
          age: updatedProfile.age,
          gender: updatedProfile.gender,
          bloodGroup: updatedProfile.blood_group,
          allergies: updatedProfile.allergies,
          chronicConditions: updatedProfile.chronic_conditions,
          emergencyContact: updatedProfile.emergency_contact,
          medicalHistory: updatedProfile.medical_history,
          height: updatedProfile.height,
          weight: updatedProfile.weight,
        }
      };
      onLoginSuccess(userData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-strong rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-xl flex items-center justify-center">
                {showHealthForm ? <Heart className="text-white" size={20} /> : <UserCircle className="text-white" size={20} />}
              </div>
              <h2 className="text-2xl font-bold text-gradient">
                {showHealthForm ? 'Complete Your Health Profile' : isLogin ? 'Welcome Back' : 'Join MediQueue'}
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X size={24} />
            </button>
          </div>

          {showHealthForm ? (
            <form onSubmit={handleHealthFormSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">Help us provide better healthcare recommendations by sharing your health details.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="glass border-0 focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="glass border-0 focus:ring-2 focus:ring-sky-400 w-full px-3 py-2 rounded-lg"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="glass border-0 focus:ring-2 focus:ring-sky-400"
                    placeholder="170"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="glass border-0 focus:ring-2 focus:ring-sky-400"
                    placeholder="70"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bloodGroup">Blood Group *</Label>
                <select
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                  className="glass border-0 focus:ring-2 focus:ring-sky-400 w-full px-3 py-2 rounded-lg"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <Label htmlFor="allergies">Known Allergies</Label>
                <Input
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  className="glass border-0 focus:ring-2 focus:ring-sky-400"
                  placeholder="Food, medicine, environmental allergies..."
                />
              </div>

              <div>
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <Input
                  id="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={(e) => setFormData({...formData, chronicConditions: e.target.value})}
                  className="glass border-0 focus:ring-2 focus:ring-sky-400"
                  placeholder="Diabetes, hypertension, asthma..."
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  className="glass border-0 focus:ring-2 focus:ring-sky-400"
                  placeholder="Contact name and phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                  className="glass border-0 focus:ring-2 focus:ring-sky-400"
                  placeholder="Previous surgeries, treatments, current medications..."
                  rows={3}
                />
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-lg rounded-xl">
                <Heart className="mr-2" size={20} />
                Complete Profile & Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={20} />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="glass border-0 focus:ring-2 focus:ring-sky-400 pl-10"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="glass border-0 focus:ring-2 focus:ring-sky-400 pl-10"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {isLogin && (
                <div>
                  <Label htmlFor="loginName">Name (for personalization)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <Input
                      id="loginName"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="glass border-0 focus:ring-2 focus:ring-sky-400 pl-10"
                      placeholder="How should we address you?"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="glass border-0 focus:ring-2 focus:ring-sky-400 pl-10"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="glass border-0 focus:ring-2 focus:ring-sky-400 pl-10"
                    placeholder="Create a secure password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-lg rounded-xl">
                {isLogin ? 'Sign In to Dashboard' : 'Create Account & Continue'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
