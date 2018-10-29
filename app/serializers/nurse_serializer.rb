class NurseSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name, :role
  has_many :visits
  has_many :patients, :through => :visits
end
