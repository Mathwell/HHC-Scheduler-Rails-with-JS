class PatientSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name
end
