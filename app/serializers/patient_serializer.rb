class PatientSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name
  has_many :visits
end
