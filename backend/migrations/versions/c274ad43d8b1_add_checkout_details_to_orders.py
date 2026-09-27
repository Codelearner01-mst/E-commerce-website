"""Add checkout details to orders.

Revision ID: c274ad43d8b1
Revises: f6ace95491df
Create Date: 2026-09-27
"""
from alembic import op
import sqlalchemy as sa


revision = "c274ad43d8b1"
down_revision = "f6ace95491df"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("orders", sa.Column("status", sa.String(length=30), nullable=False, server_default="pending"))
    op.add_column("orders", sa.Column("first_name", sa.String(length=155), nullable=False, server_default=""))
    op.add_column("orders", sa.Column("last_name", sa.String(length=155), nullable=False, server_default=""))
    op.add_column("orders", sa.Column("email", sa.String(length=255), nullable=False, server_default=""))
    op.add_column("orders", sa.Column("phone", sa.String(length=30), nullable=False, server_default=""))
    op.add_column("orders", sa.Column("country", sa.String(length=100), nullable=False, server_default=""))
    op.add_column("orders", sa.Column("address", sa.String(length=255), nullable=False, server_default=""))
    op.add_column("orders", sa.Column("city", sa.String(length=120), nullable=False, server_default=""))
    op.add_column("orders", sa.Column("message", sa.Text(), nullable=True))
    op.add_column("orders", sa.Column("payment_method", sa.String(length=30), nullable=False, server_default="cod"))


def downgrade():
    with op.batch_alter_table("orders") as batch_op:
        batch_op.drop_column("payment_method")
        batch_op.drop_column("message")
        batch_op.drop_column("city")
        batch_op.drop_column("address")
        batch_op.drop_column("country")
        batch_op.drop_column("phone")
        batch_op.drop_column("email")
        batch_op.drop_column("last_name")
        batch_op.drop_column("first_name")
        batch_op.drop_column("status")
