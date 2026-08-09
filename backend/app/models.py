from typing import Optional
from sqlalchemy import String, Integer, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class StatItemModel(Base):
    __tablename__ = "stats"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    label: Mapped[str] = mapped_column(String(255), nullable=False)
    value: Mapped[str] = mapped_column(String(255), nullable=False)


class VolunteerModel(Base):
    __tablename__ = "volunteers"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    subject: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    created_at: Mapped[str] = mapped_column(String(100), nullable=False)


class StudentModel(Base):
    __tablename__ = "students"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    student_name: Mapped[str] = mapped_column(String(255), nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    parent_name: Mapped[str] = mapped_column(String(255), nullable=False)
    parent_email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    subject: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    created_at: Mapped[str] = mapped_column(String(100), nullable=False)


class ReviewModel(Base):
    __tablename__ = "reviews"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(100), nullable=False)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    date: Mapped[str] = mapped_column(String(50), nullable=False)


class PublicationModel(Base):
    __tablename__ = "publications"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    author: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    excerpt: Mapped[str] = mapped_column(Text, nullable=False)
    content: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="draft", nullable=False)
    date: Mapped[str] = mapped_column(String(50), nullable=False)


class BranchModel(Base):
    __tablename__ = "branches"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    lead: Mapped[str] = mapped_column(String(255), nullable=False)
    volunteers: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class TopVolunteerModel(Base):
    __tablename__ = "top_volunteers"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    cohort: Mapped[str] = mapped_column(String(100), nullable=False)
    award: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    photo_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)


class CohortModel(Base):
    __tablename__ = "cohorts"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    period: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class TeamMemberModel(Base):
    __tablename__ = "team_members"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(255), nullable=False)
    photo: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)


class AdminModel(Base):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
