class VisitSerializer < ActiveModel::Serializer
  attributes :id, :date
  belongs_to :patient
  belongs_to :nurse
end
