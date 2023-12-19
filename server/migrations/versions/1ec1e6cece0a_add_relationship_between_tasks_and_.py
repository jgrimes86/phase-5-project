"""Add relationship between tasks and templates

Revision ID: 1ec1e6cece0a
Revises: 6ba4312ac6b7
Create Date: 2023-12-19 12:43:28.792639

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1ec1e6cece0a'
down_revision = '6ba4312ac6b7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('template_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_tasks_template_id_templates'), 'templates', ['template_id'], ['id'])

    with op.batch_alter_table('templates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('task_list', sa.Text(), nullable=True))
        batch_op.drop_column('tasks')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('templates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tasks', sa.TEXT(), nullable=True))
        batch_op.drop_column('task_list')

    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_tasks_template_id_templates'), type_='foreignkey')
        batch_op.drop_column('template_id')

    # ### end Alembic commands ###
