class NurseSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name, :role
end