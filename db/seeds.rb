DATA = {
  :user_keys =>
    ["username", "first_name", "last_name", "email", "admin", "password"],
  :users => [
    ["max", "Max", "Charles","max@gmail.com",true, "password"],
    ["skai", "Skai", "Jackson", "skai@gmail.com", false, "password"],
    ["kaleo", "Kaleo", "Elam", "kaleo@gmail.com", false,"password"],
    ["olena", "Olena","Ageyeva", "olena@gmail.com", true, "password"],

  ],
  :nurse_keys =>
   ["first_name", "last_name", "role"],
  :nurses => [
    ["Martha","Nokia","nurse"],
    ["Ahn","Ngo", "nurse"],
    ["Brioso", "Lusa", "HHA"],
    ["Kathryn", "Barnshrein", "nurse"],
  ],

  :patient_keys =>
   ["first_name", "last_name", "nurse_id"],
  :patients => [
    ["Nola","Altara",1],
    ["Maria","Gordivia", 2],
    ["Ponny", "Long", 1],
    ["Ba", "La", 1],
  ],


  :admins => [
    "olena",
    "max"
  ]
}

def main
  make_users
  make_admin
  make_nurses
  make_patients
end

def make_users
  DATA[:users].each do |user|
    new_user = User.new
    user.each_with_index do |attribute, i|
      new_user.send(DATA[:user_keys][i]+"=", attribute)
    end
    new_user.save
  end
end

def make_admin
  DATA[:admins].each do |username|
    User.create(username: username, admin: true, password: 'password')
  end
end

def make_nurses
  DATA[:nurses].each do |nurse|
    new_nurse = Nurse.new
    nurse.each_with_index do |attribute, i|
      new_nurse.send(DATA[:nurse_keys][i] + "=", attribute)
    end
    new_nurse.save
  end
end

def make_patients
  DATA[:patients].each do |patient|
    new_patient = Patient.new
    patient.each_with_index do |attribute, i|
      new_patient.send(DATA[:patient_keys][i] + "=", attribute)
    end
    new_patient.save
  end
end



main
