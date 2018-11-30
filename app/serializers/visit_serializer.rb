class VisitSerializer < ActiveModel::Serializer
  attributes :id, :date, :patient_name
  belongs_to :patient
  belongs_to :nurse

  def patient_name
    self.object.patient.name
  end
end
